import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Settings",
    useAsTitle: "email",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
