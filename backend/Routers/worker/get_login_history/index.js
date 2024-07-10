import { Router } from "express";
import Joi from "joi";

const router = Router();

router.get("/", async function (req, res){

    const Schema = Joi.object(
        {
            page : Joi.number().required().min(1),
            size : Joi.number().required().min(1)
        }
    );
    const checkSchema = Schema.validate(req.query);
    if(checkSchema.error) return res.status(400).send(checkSchema.error.message)
try {

    const {page, size} = req.query;
        const data = await global.pool.query(
    `
    SELECT 
    product.id AS id,
    product.product_type_id AS product_type_id,
    product.category_id,
    product.name AS product,
    product.price,
    product.discount_price,
    product.discount,
    product.quantity,
    product_types.name AS product_types_name,
    categories.name AS categories_name
FROM 
    product
INNER JOIN 
    product_types ON product.product_type_id = product_types.id
INNER JOIN 
    categories ON product.category_id = categories.id
WHERE 
    product.state = true

LIMIT $1 OFFSET ($2 - 1)  *  $3;	
	
    `,
    [size, page, size]
        )

return res.status(200).send(data.rows)
} catch (error) {
    res.status(500).send("Serverda xatolik : (");
    console.log("! Error : get_caterogies: ", error)
}

});

export default router;   