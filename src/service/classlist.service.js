const ClassList = require('../model/class.model')
const { Op } = require("sequelize");
class ClassService {

    async getClassList(year='2021',season='2021',current ) {

        let pageSize = 10;
        const res = await ClassList.findAll({
            where: {
                year: {
                [Op.eq]: year
              },
              season:{
                [Op.eq]:season
              },
            }
          });
        console.log(res)
        return res ? res : null
    }
}
module.exports = new ClassService()