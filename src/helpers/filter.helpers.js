const errorHandler = require("./errorHandler.helpers")

const filters = (data, sortable, countModel, res, cb) => {
  data.page = parseInt(data.page) || 1
  data.limit = parseInt(data.limit) || 5
  data.search = data.search || ''
  data.sortBy = (sortable.includes(data.sortBy) && data.sortBy) || 'createdAt'
  data.sort = data.sort || ''
  data.year = data.year || ''
  data.month = data.month || ''


  const params = {
    limit: data.limit,
    offset: (parseInt(data.page) - 1) * data.limit,
    search: data.search,
    sort: data.sort,
    sortBy: data.sortBy,
    year: data.year,
    month: data.month
  }

  const pageInfo = {
    page: data.page
  }

  countModel(params, (err, results) => {
    if(err){
      return errorHandler(err, res)
    }
    pageInfo.totalData = parseInt(results.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / data.limit)
    pageInfo.nextPage = data.page < pageInfo.totalPage ? data.page + 1 : null
    pageInfo.prevPage = data.page > 1 ? data.page + 1 : null
    cb(params, pageInfo)
  })
};


module.exports = filters
