import { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    useAPIKey: true,
  },
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
