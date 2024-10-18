import { z } from "zod";
import { zfd } from "zod-form-data";

export const signUpActionSchema = zfd.formData({
  username: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(6)),
  provider: zfd.text(z.string()),
});
