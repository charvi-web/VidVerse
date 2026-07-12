import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource.
 *
 * Default email sign-in with a single ADMIN group for the admin portal.
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["ADMIN"],
});
