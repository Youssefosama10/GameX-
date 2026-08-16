import * as zod from 'zod'
 export const LoginSchema = zod.object({
  email: zod.email('Email is invalid').nonempty('Email is required'),
  password: zod.string().nonempty('password is required ').regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Invalid password format. Please follow the required rules.'),
})


// required

export type LoginObjectType = zod.infer< typeof LoginSchema >