const ClassList = require('../model/class.model')
const { Op } = require("sequelize");
class ClassService {

    async getClassList(year='',season='',current ) {
        let res = []
        if(year ===''||season === ''){
             res = await ClassList.findAll();
        }else{
             res = await ClassList.findAll({
                where: {
                    year: {
                    [Op.eq]: year
                  },
                  season:{
                    [Op.eq]:season
                  },
                }
              });
        }
        let ret = []
        let pageSize = 10*current;
        for(let i = pageSize-10;i<pageSize;i++){
            if(res[i]){
                ret.push(res[i])
            }
        }
        
        console.log(res)
        return ret ? ret : null
    }
    async findClassListByClassName(className){
        let res = []
        res = await ClassList.findAll({
            where: {
                className:{
                    [Op.startsWith]: className,
                }
            }
          });
          // SELECT * FROM post WHERE authorId = 2;
          return res
    }
    async uploadClassCover(classCover,className){
      let res = '';
      res = await ClassList.update({classCover},{
        where:{
          className
        }
      })
      return res
    }
}
module.exports = new ClassService()