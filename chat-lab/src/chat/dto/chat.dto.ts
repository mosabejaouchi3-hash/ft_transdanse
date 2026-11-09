import { IsString, IsNotEmpty } from 'class-validator'



export interface CreateChatDto {
  senderId: string;
  text: string;
  roomId: string;
}


// export class CreateChatDto {
 
//   @IsString()
//   @IsNotEmpty()
//   readonly senderId: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly roomId: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly text: string;
// }