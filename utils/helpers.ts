import bcrypt from "bcrypt"

export function generatePasswordHash(password:string) {
	return bcrypt.hash(password, 12).then((hash:string) => {
		return hash
	})
}