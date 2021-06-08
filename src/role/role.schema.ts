import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
    PermissionDatabaseName,
    PermissionEntity
} from 'src/permission/permission.schema';

@Schema()
export class RoleEntity {
    @Prop({
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true
    })
    name: string;

    @Prop({
        required: true,
        type: Array,
        default: [],
        ref: PermissionEntity.name
    })
    permissions: PermissionEntity[];

    @Prop({
        required: true,
        index: true
    })
    isActive: boolean;
}

export const RoleDatabaseName = 'roles';
export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
