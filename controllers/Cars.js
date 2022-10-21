import Cars from "../models/CarsModel.js";
import jwt from "jsonwebtoken";
 
// const Cars = db.Cars
export const getCars = async(req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
          status: "Unauthorized",
          message: "You are not authorized to get Cars",
        });
        return;
      }
        const cars = await Cars.findAll({
            attributes:['id','name','type','price','size','createdBy', 'updatedBy','deletedBy']
        });
        res.json(cars);
}

export const getCarById = async(req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
          status: "Unauthorized",
          message: "You are not authorized to get Cars",
        });
        return;
      }
    const { id } = req.params;
    const cars = await Cars.findOne({
        where: { id: id },
    });
    res.json(cars);
}

export const createCars = async(req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
          status: "Unauthorized",
          message: "You are not authorized to create cars",
        });
        return;
      }
    const { name, type, price, size, createdBy} = req.body;
    try {
        await Cars.create({
            name: name,
            type: type,
            price: price,
            size: size,
            createdBy: req.user.name
        });
        return res.status(200).json({
            success: true,
            message: "Mobil Berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCars = async(req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
          status: "Unauthorized",
          message: "You are not authorized to update cars",
        });
        return;
      }
    const { id } = req.params;
    const { name, type, price, size, updatedBy} = req.body;
        try {
            await Cars.update(
                { name: name, type: type, price: price, size: size, updatedBy: req.user.name },
                {
                where: { id: id},
                }
            );
            return res.status(200).json({
                success: true,
                message: "Mobil Berhasil diupdate",
            });
        } catch (error) {
            console.log(error);
        }
}

export const deleteCars = async(req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
          status: "Unauthorized",
          message: "You are not authorized to delete cars",
        });
        return;
      }
    const { id } = req.params;
    const dataBeforeDelete = await Cars.findOne({
    where: { id: id },
    });
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

    if (!parsedDataProfile) {
        return res.status(400).json({
            success: false,
            message: "Cars doesn't exist or has been deleted!",
        });
    }

    await Cars.destroy({
        where: { id },
    });

    return res.status(200).json({
        success: true,
        message: "Delete Data Successfully",
    });
}
    