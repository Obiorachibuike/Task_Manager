import mongoose, { Document } from 'mongoose';
interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    deadline: Date;
}
declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask> & ITask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { Task };
