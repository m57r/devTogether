const { Language, Technology } = require('./models');

const utils = {

	/**  @function 
    * handle pagination
    * @param {Number} page page's number
    */
	paginate(pageNumber){

		if(isNaN(Number(pageNumber)) || pageNumber <0){
			throw new Error('This page doesn\'t exist'); 
		}
		const limit = 6; 
		const offset =  pageNumber * limit; 
        
		return(
			{
				limit : limit, 
				offset : offset 
			}
		);
	}, 

	async findElementInDataBase(idList, languages = null, technologies = null, id){
		let ModelTable; 
		if(languages && idList === languages){
			ModelTable = Language; 
		}
		if(technologies && idList === technologies ){
			ModelTable = Technology;
		}
		const element = await ModelTable.findByPk(id); 
		if(!element){
			const error = new Error(`Element with id ${id} does not exist`);
			throw error.status(404).json({message : error.message});
		}

		return element;
	}, 

	test(idList, user, languages = null, technologies = null){

		const initialIdList = user.idList.map(item => item.id); 

		const commonIdList = idList.filter(item => initialIdList.includes(item)); 

		let elementsToAdd = []; 
		
		for(let item of idList){
			if(!commonIdList.includes(item)){
				let element = utils.findElementInDataBase(idList, languages, technologies, item);
				elementsToAdd.push(element); 
			}
		}

		let elementsToRemove = []; 
		for(let item of initialIdList){
			if(!commonIdList.includes(item)){
				let element = utils.findElementInDataBase(idList, languages, technologies, item);
				elementsToRemove.push(element); 
			}
		}

		return {
			elementsToAdd, elementsToRemove
		};

	}

};

module.exports = utils; 
