import { Router } from "express";
import Joi from "joi";
import { token_check } from "../../../Functions/jwt.js";
const router = Router();

router.get("/",[token_check], async function (req, res){

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
    product.product_type_id as product_type_id,
    category_id,
    product.name as product,
    price,
    discount_price,
    discount,
    quantity,
	product_types.name as product_types_name,
	categories.name as categories_name
FROM 
    product
INNER JOIN 
    product_types ON product.product_type_id = product_types.id
inner join categories on  product.category_id = categories.id
where product.state = true
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