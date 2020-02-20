require('dotenv').config()
const knex = require('knex')


const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})


function searchShoppingItem(searchTerm) {
    knexInstance
        .select('shopping_id', 'item_name', 'item_price', 'category')
        .from('shopping_list')
        .where('item_name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log('SEARCH TERM', { searchTerm })
            console.log(result)
        })
}

searchShoppingItem('urger')



function paginateShoppingList(page) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (page -1)

    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log('PAGINATE ITEMS', { page })
            console.log(result)
        })
}

paginateShoppingList(2)


function itemsAfterACertainDate(days) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .count('date_added AS date')
        .where(
            'date_addded',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
        )
        .from('shopping_list')
        .groupBy('item_name', 'category')
        .orderBy([
            {column: 'category', order: 'ASC'},
            {column: 'date',  order: 'DESC'},
        ])
        .then(result => {
            console.log('PRODUCTS ADDED DAYS AGO')
            console.log(result)
        })
}

itemsAfterACertainDate(5)

function costPerCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('COST PER CATEGORY')
            console.log(result)
        })
}

costPerCategory()
