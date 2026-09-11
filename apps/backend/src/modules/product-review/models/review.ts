import { model } from "@medusajs/framework/utils"

const review = model
  .define("review", {
    id: model.id().primaryKey(),
    product_id: model.text(),
    customer_id: model.text(),
    rating: model.number(),
    text: model.text().nullable(),
    is_edited: model.boolean().default(false),
    status: model.enum(["pending", "approved", "rejected"]).default("pending"),
    approved_at: model.dateTime().nullable(),
    rejection_reason: model.text().nullable(),
  })
  .checks([
    {
      name: "rating_range_check",
      expression: (columns) =>
        `${columns.rating} >= 1 AND ${columns.rating} <= 5`,
    },
    {
      name: "text_length_check",
      expression: (columns) =>
        `LENGTH(${columns.text}) <= 1000 AND LENGTH(${columns.text}) >= 5`,
    },
  ]);