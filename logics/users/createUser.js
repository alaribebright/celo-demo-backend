import {User} from "../../models/userModel";

export async function createUser(data) {
	const user = await User.create(data);


}

function createUserWallet(user) {
	
}