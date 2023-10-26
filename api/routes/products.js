const express = require('express');
const {
    createSmallSavory,
    getSmallSavorys,
    deleteSmallSavory,
    editSmallSavory,
    createSmallSweet,
    getSmallSweets,
    editSmallSweet,
    deleteSmallSweet,
    createDoubleCrust,
    getDoubleCrusts,
    editDoubleCrust,
    deleteDoubleCrust,
    getLargePies,
    createLargePie,
    editLargePie,
    deleteLargePie,
    getBrittles,
    createBrittle,
    editBrittle,
    deleteBrittle,
    getCookies,
    createCookie,
    editCookie,
    deleteCookie
} = require('../queries/products');


const router = express.Router();

router.get('/brittles', getBrittles);
router.post('/brittles', createBrittle);
router.put('/brittles/:brittleid', editBrittle);
router.delete('/brittles/:brittleid', deleteBrittle);

router.get('/cookies', getCookies);
router.post('/cookies', createCookie);
router.put('/cookies/:cookieid', editCookie);
router.delete('/cookies/:cookieid', deleteCookie);

router.get('/large', getLargePies);
router.post('/large', createLargePie);
router.put('/large/:id', editLargePie);
router.delete('/large/:id', deleteLargePie);

router.get('/double', getDoubleCrusts);
router.post('/double', createDoubleCrust);
router.put('/double/:id', editDoubleCrust);
router.delete('/double/:id', deleteDoubleCrust);

router.get('/savory', getSmallSavorys);
router.post('/savory', createSmallSavory);
router.put('/savory/:id', editSmallSavory);
router.delete('/savory/:id', deleteSmallSavory);

router.get('/sweet', getSmallSweets);
router.post('/sweet', createSmallSweet);
router.put('/sweet/:id', editSmallSweet);
router.delete('/sweet/:id', deleteSmallSweet);

module.exports = router;
