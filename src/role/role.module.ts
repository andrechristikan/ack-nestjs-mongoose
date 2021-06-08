import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from 'src/role/role.service';
import { RoleDatabaseName, RoleEntity, RoleSchema } from './role.schema';

@Global()
@Module({
    providers: [RoleService],
    exports: [RoleService],
    imports: [
        MongooseModule.forFeature([
            {
                name: RoleEntity.name,
                schema: RoleSchema,
                collection: RoleDatabaseName
            }
        ])
    ]
})
export class RoleModule {}
