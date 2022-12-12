import {Expose, Transform} from "class-transformer";

export class CreateUserResponseDto {
    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    role: string;

    @Transform(({obj}) => {
        return obj._id;
    })
    @Expose()
    id: string;

}
