import * as zod from 'zod'
 export const RegisterSchema = zod.object({
  firstName: zod.string().nonempty("First Name is required").min(3, 'First Name must be at least 3 characters').max(25, 'First Name must be maximum 25 characters'),
  lastName : zod.string().nonempty("last Name is required").min(3, 'last Name must be at least 3 characters').max(25, 'last Name must be maximum 25 characters'),
  username : zod.string().nonempty("user Name is required").min(3, 'user Name must be at least 3 characters').max(25, 'user Name must be maximum 25 characters'),
  email: zod.email('Email is invalid').nonempty('Email is required'),
  password: zod.string().nonempty('password is required ').regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Invalid password format. Please follow the required rules.'),
  rePassword: zod.string().nonempty('Repassword is requird').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Invalid password format. Please follow the required rules.'),
}).refine(
  function (obj) {
    return obj.password === obj.rePassword
  },
  { path: ['rePassword'], error: 'passwords are inmatch' }
)

// required

export type RegisterObjectType = zod.infer< typeof RegisterSchema >