const {response} = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const {updateImage} = require('../helpers/update-image');

const fileUpload = (req, res = response) => {

    const {type, id} = req.params;

    // validate type
    const allowedTypes = ['hospitals', 'doctors', 'users'];
    if (!allowedTypes.includes(type)) {
        return res.status(400).json({
            ok: true,
            msg: 'Invalid document type'
        })
    }

    // file validation
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            msg: 'No files were uploaded'
        })
    }


    // process image
    const file = req.files.image;

    const nameArr = file.name.split('.');
    const extension = nameArr[nameArr.length - 1];

    const allowedExtensions = ['jpg', 'png', 'jpeg', 'gif', 'svn'];
    if (!allowedExtensions.includes(extension)) {
        return res.status(400).json({
            ok: true,
            msg: 'Invalid document type'
        })
    }

    // Generate file name
    const fileName = `${uuidv4()}.${extension}`;

    // create path to save image
    const path = `./uploads/${type}/${fileName}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error, the file cannot be uploaded'
            });
        }

        // Update DB
        updateImage(type, id, fileName);

        res.status(200).json({
            ok: true,
            msg: 'File uploaded',
            fileName
        })
    });
};

const getImage = (req, res = response) => {
    const {type, img} = req.params;
    let pathImg = path.join( __dirname, `../uploads/${type}/${img}`);

    // default image
    if (!fs.existsSync(pathImg)) {
        pathImg =  path.join( __dirname, `../uploads/No-image-available.png`);
    }

    res.sendFile(pathImg);

};

module.exports = {fileUpload, getImage};
