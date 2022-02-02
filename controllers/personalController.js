const Personals = require('../models/personalModel');
const {
	validateEmail,
	createAccessToken,
	createRefreshToken,
} = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc   Fetch All Personals
//@route  Get -> /api/personal
//@access Private/Admin
const allPersonals = async (req, res) => {
	try {
		const allPersonals = await Personals.find({});
		if (allPersonals.length === 0)
			return res.status(400).json({ msg: 'Kayıt Yok' });
		return res.status(200).json({ personals: allPersonals });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Fetch A Personal
//@route  Get -> /api/personal/:id
//@access Private/Admin
const singlePersonal = async (req, res) => {
	try {
		const { id } = req.params;
		const singlePersonal = await Personals.findById(id);
		if (singlePersonal === null)
			return res.status(400).json({ msg: 'Kayıt Yok' });
		return res.status(200).json({ personal: singlePersonal });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Create A Personal
//@route  Post -> /api/personal
//@access Private/Admin
const createPersonal = async (req, res) => {
	try {
		const {
			avatar,
			personalName,
			personalIdentityNumber,
			personalPassword,
			personalBloodGroup,
			personalGender,
			personalCity,
			personalBirthday,
			personalEmail,
			personalPhone,
			personalSalary,
			personalClinic,
			personalAuthority,
			personalAddress,
		} = req.body;
		if (
			!personalName ||
			!personalIdentityNumber ||
			!personalPassword ||
			!personalEmail
		)
			return res.status(400).json({ msg: 'Gerekli alanları doldurun' });
		if (!validateEmail(personalEmail))
			return res.status(400).json({ msg: 'Geçersiz email' });
		const personalExist = await Personals.findOne({ personalEmail });
		if (personalExist)
			return res.status(400).json({ msg: 'Bu email zaten kayıtlı' });
		if (personalPassword.length < 8)
			return res.status(400).json({ msg: 'Şifre en az 8 karakter olmalı' });
		const hashedPassword = await bcrypt.hash(personalPassword, 12);
		const newPersonal = new Personals({
			avatar,
			personalName: `${personalName}-${personalIdentityNumber}`,
			personalIdentityNumber,
			personalPassword: hashedPassword,
			personalBloodGroup,
			personalGender,
			personalCity,
			personalBirthday,
			personalEmail,
			personalPhone,
			personalSalary,
			personalClinic,
			personalAuthority,
			personalAddress,
		});
		const access_token = createAccessToken({ id: newPersonal._id });
		const refresh_token = createRefreshToken({ id: newPersonal._id });
		res.cookie('refreshToken', refresh_token, {
			httpOnly: true,
			path: '/api/personal/refresh_token',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		await newPersonal.save();
		return res.status(201).json({
			msg: 'Personal Kaydı Oluşturuldu',
			access_token,
			personal: {
				...newPersonal._doc,
				personalPassword: '',
			},
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Personal
//@route  Patch -> /api/personal/:id
//@access Private/Admin
const updatePersonal = async (req, res) => {
	try {
		const { id } = req.params;
		await Personals.findByIdAndUpdate({ _id: id }, req.body, { new: true });
		return res.status(200).json({ msg: 'Personel Kaydı Güncellendi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Personal
//@route  Delete -> /api/personal/:id
//@access Private/Admin
const deletePersonal = async (req, res) => {
	try {
		const { id } = req.params;
		await Personals.findByIdAndDelete({ _id: id });
		return res.status(200).json({ msg: 'Personel Kaydı Silindi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Login Personal
//@route  Post -> /api/personal/login
//@access Private/Admin
const login = async (req, res) => {
	try {
		const { personalEmail, personalPassword } = req.body;
		if (!personalEmail || !personalPassword)
			return res.status(400).json({ msg: 'Boş alan bırakılamaz' });
		const personal = await Personals.findOne({ personalEmail });
		if (!personal)
			return res.status(400).json({ msg: 'E-mail veya şifre yanlış' });
		const isMatch = await bcrypt.compare(
			personalPassword,
			personal.personalPassword
		);
		if (!isMatch)
			return res.status(400).json({ msg: 'E-mail veya şifre yanlış' });
		const access_token = createAccessToken({ id: personal._id });
		const refresh_token = createRefreshToken({ id: personal._id });
		res.cookie('refreshToken', refresh_token, {
			httpOnly: true,
			path: '/api/personal/refresh_token',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		return res.status(200).json({
			msg: 'Giriş Başarılı',
			access_token,
			personal: {
				...personal._doc,
				personalPassword: '',
			},
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Logout Personal
//@route  Post -> /api/personal/logout
//@access Private/Admin
const logout = async (req, res) => {
	try {
		res.clearCookie('refreshToken', { path: '/api/personal/refresh_token' });
		return res.status(200).json({ msg: 'Çıkış Yapıldı' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Generate Access Token
//@route  Post -> /api/personal/refresh_token
//@access Private/Admin
const generateAccessToken = async (req, res) => {
	try {
		const rf_token = req.cookies.refreshToken;
		if (!rf_token) return res.status(400).json({ msg: 'Lütfen giriş yapın' });
		jwt.verify(
			rf_token,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, result) => {
				if (err) return res.status(400).json({ msg: 'Lütfen giriş yapın' });
				const personal = await Personals.findById(result.id).select(
					'-personalPassword'
				);
				if (!personal) return res.status(400).json({ msg: 'Kişi bulunamadı' });
				const access_token = createAccessToken({ id: result.id });
				return res.status(200).json({
					access_token,
					personal,
				});
			}
		);
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Refresh Password
//@route  Post -> /api/personal/refresh_password/:id
//@access Private/Admin
const refreshPassword = async (req, res) => {
	try {
		const { id } = req.params;
		const { personalPassword, personalPasswordConfirm } = req.body;
		if (!personalPassword || !personalPasswordConfirm)
			return res.status(400).json({ msg: 'Boş alan bırakmayınız' });
		if (personalPassword.length < 8)
			return res.status(400).json({ msg: 'Şifre en az 8 karakter olmalı' });
		if (personalPassword !== personalPasswordConfirm)
			return res.status(400).json({ msg: 'Şifreler eşleşmiyor' });
		const hashedPassword = await bcrypt.hash(personalPassword, 12);
		await Personals.findByIdAndUpdate(
			{ _id: id },
			{ personalPassword: hashedPassword },
			{ new: true }
		);
		return res.status(200).json({ msg: 'Şifre Yenilendi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = {
	allPersonals,
	singlePersonal,
	createPersonal,
	updatePersonal,
	deletePersonal,
	login,
	logout,
	generateAccessToken,
	refreshPassword,
};
