import express from 'express';
import { studentModel } from './../schemas/student.schema';
import { createPermission, updatePermission, deletePermission } from './../permission/staff.permission'

export const studentRouter = express.Router();


studentRouter.get('/', async (req, res)=>{
    studentModel.find({}).then((data)=>{
        res.send(data);
    }).catch(err=>{
        res.status(401).send(err);
    })
})

studentRouter.get('/student/:id', async (req, res)=>{
    const studentId = req.params.id;
    studentModel.findById({_id: studentId}).then((data)=>{
        res.send(data);
    }).catch(err=>{
        res.status(404).send(err);
    })
})

studentRouter.post('/', createPermission, async (req, res)=>{
    const student = new studentModel(req.body);
    try{
        await student.save();
        res.send(student);
    }catch(err){
        res.status(404).send({err});
    }
})

studentRouter.put('/student/:id', updatePermission, async (req, res)=>{
    const studentId = req.params.id;
    const newData = req.body;
    studentModel.findByIdAndUpdate({_id: studentId}, newData, {new: true}).then((data)=>{
        res.send(data);
    }).catch(err=>{
        res.status(404).send(err);
    })
})

studentRouter.delete('/student/:id', deletePermission, async (req, res)=>{
    const studentId = req.params.id;
    studentModel.findByIdAndDelete({_id: studentId}).then((data)=>{
        res.send(data);
    }).catch(err=>{
        res.status(404).send(err);
    })
})

