import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInit(req.query.page, 10) : 0

    // 16/03/2022 - TAG: Search of name not triggering a result. Replace with generated search index for the name text field
    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.filter.name
    }

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    })

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      enteries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response)
  }
}