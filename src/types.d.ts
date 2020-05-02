import { UserDoc } from "./users/users.interface";

declare global {
    namespace Express {
        // Tells that req.user object in Express request are UserDoc
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserDoc {}
    }
}
