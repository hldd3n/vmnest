import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        type: 'nvarchar',
        length: 45,
        unique: true,
    })
    username: string;

    @Column({
        type: 'nvarchar',
        length: 76,
    })
    password: string;
}
