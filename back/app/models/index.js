const Card = require('./card');
const Category = require('./category');
const Conversation = require('./conversation');
const Language = require('./language');
const List = require('./list'); 
const Message = require('./message');
const Project = require('./project');
const Recommendation = require('./recommendation');
const Role = require('./role'); 
const Tag = require('./tag');
const Technology = require('./technology');
const User = require('./user'); 


//Association between technology and category - one to many
Category.hasMany(Technology, {
	as : 'technologies',
	foreignKey: 'category_id'
});


Technology.belongsTo(Category, {
	as: 'category',
	foreignKey: 'category_id'
});

//Association between user and message - one to many
Message.belongsTo(User, {
	as : 'sender', 
	foreignKey: 'message_id'
}); 

User.hasMany(Message, {
	as : 'messages', 
	foreignKey: 'message_id'
}); 

//Association between conversation and message - one to many
Message.belongsTo(Conversation, {
	as : 'conversation', 
	foreignKey: 'conversation_id'
}); 

Conversation.hasMany(Message, {
	as : 'messages_conversation', 
	foreignKey: 'conversation_id'
}); 

//Association between project and user (propose project) - one to many
User.hasMany(Project, {
	as: 'projects_proposed', 
	foreignKey: 'user_id'
}); 

Project.belongsTo(User, {
	as: 'author', 
	foreignKey: 'user_id'
}); 

//Association between project and list - one to many
Project.hasMany(List, {
	as: 'lists', 
	foreignKey: 'project_id'
}); 

List.belongsTo(Project, {
	as: 'project', 
	foreignKey: 'project_id'
}); 

//Association between card and list - one to many
List.hasMany(Card, {
	as: 'cards_in_list',
	foreignKey: 'list_id',
});

Card.belongsTo(List, {
	as: 'list',
	foreignKey: 'list_id',
});

// Association between technology and user - many to many 
Technology.belongsToMany(User, {
	as: 'users', 
	through: 'master', 
	foreignKey: 'technology_id',
	otherKey: 'user_id', 
	timestamps: false,
});

User.belongsToMany(Technology, {
	as: 'user_technologies', 
	through: 'master', 
	foreignKey: 'user_id',
	otherKey: 'technology_id',
	timestamps: false,
});

// Association between language and user - many to many 
Language.belongsToMany(User, {
	as: 'speakers', 
	through: 'speak', 
	foreignKey: 'language_id',
	otherKey: 'user_id', 
	timestamps: false,
});

User.belongsToMany(Language, {
	as: 'languages', 
	through: 'speak', 
	foreignKey: 'user_id',
	otherKey: 'language_id',
	timestamps: false,
});

// Association between card and user - many to many
Card.belongsToMany(User, {
	as: 'users_assigned', 
	through: 'assigned', 
	foreignKey: 'card_id',
	otherKey: 'user_id', 
	timestamps: false,
});

User.belongsToMany(Card, {
	as: 'cards', 
	through: 'assigned', 
	foreignKey: 'user_id',
	otherKey: 'card_id',
	timestamps: false,
});

// Association between project and user ( favorite ) - many to many
Project.belongsToMany(User, {
	as: 'users', 
	through: 'favorite', 
	foreignKey: 'project_id',
	otherKey: 'user_id', 
	timestamps: false,
});

User.belongsToMany(Project, {
	as: 'favorite_projects', 
	through: 'favorite', 
	foreignKey: 'user_id',
	otherKey: 'project_id',
	timestamps: false,
});

// Association between project and user ( take_stand )- many to many
Project.belongsToMany(User, {
	as: 'positioned_users', 
	through: 'take_stand', 
	foreignKey: 'project_id',
	otherKey: 'user_id', 
	timestamps: false,
});

User.belongsToMany(Project, {
	as: 'wanted_projects', 
	through: 'take_stand', 
	foreignKey: 'user_id',
	otherKey: 'project_id',
	timestamps: false,
});

// Association between project and user ( work_on )- many to many
Project.belongsToMany(User, {
	as: 'team_users', 
	through: 'work_on', 
	foreignKey: 'project_id',
	otherKey: 'user_id',
	timestamps: false,
});

User.belongsToMany(Project, {
	as: 'projects_working_on', 
	through: 'work_on', 
	foreignKey: 'user_id',
	otherKey: 'project_id',
	timestamps: false,
});

//Association between user and role - many to many
Role.belongsToMany(User, {
	as: 'users', 
	through: 'work_on', 
	foreignKey: 'role_id',
	otherKey: 'user_id',
	timestamps: false,
});

User.belongsToMany(Role, {
	as: 'user_roles', 
	through: 'work_on', 
	foreignKey: 'user_id',
	otherKey: 'role_id',
	timestamps: false,
});

//Association between project and role 
Role.belongsToMany(Project, {
	as: 'project_with_roles', 
	through: 'work_on', 
	foreignKey: 'role_id',
	otherKey: 'user_id',
	timestamps: false,
}); 

Project.belongsToMany(Role, {
	as: 'roles_on_projects', 
	through: 'work_on', 
	foreignKey: 'project_id',
	otherKey: 'role_id',
	timestamps: false,
});


// Association between project and technology- many to many
Project.belongsToMany(Technology, {
	as: 'technologies', 
	through: 'use', 
	foreignKey: 'project_id',
	otherKey: 'technology_id', 
	timestamps: false,
});

Technology.belongsToMany(Project, {
	as: 'projects', 
	through: 'use', 
	foreignKey: 'technology_id',
	otherKey: 'project_id',
	timestamps: false,
});

// Association between user and conversation - many to many
User.belongsToMany(Conversation, {
	as: 'conversations', 
	through: 'compose', 
	foreignKey: 'user_id',
	otherKey: 'project_id', 
	timestamps: false,
});

Conversation.belongsToMany(User, {
	as: 'users_conversations', 
	through: 'compose', 
	foreignKey: 'conversation_id',
	otherKey: 'user_id',
	timestamps: false,
});

// Association between card and tag- many to many
Card.belongsToMany(Tag, {
	as: 'tags',
	through: 'card_has_tag',
	foreignKey: 'card_id',
	otherKey: 'tag_id',
	timestamps: false, 
});

Tag.belongsToMany(Card, {
	as: 'cards',
	through: 'card_has_tag',
	foreignKey: 'tag_id',
	otherKey: 'card_id',
	timestamps: false,
});


// Association involving the same models User (recommendation)- many to many
User.belongsToMany(User, {
	as: 'recommended_user', 
	through: Recommendation,
	foreignKey: 'user_id',
	otherKey: 'recommended_user_id',
});

User.belongsToMany(User, {
	as: 'recommending_user', 
	through: Recommendation,
	foreignKey: 'recommended_user_id',
	otherKey: 'user_id' ,
});

// Association involving the same models User (follow)- many to many
User.belongsToMany(User, {
	as: 'followed_user', 
	through: 'follow',
	foreignKey: 'user_id',
	otherKey: 'follower_id',
	timestamps: false,
});

User.belongsToMany(User, {
	as: 'follower_user', 
	through: 'follow',
	foreignKey: 'follower_id',
	otherKey: 'user_id' ,
	timestamps: false,
});

module.exports = {
	Technology, 
	User, 
	Language, 
	Card, 
	Tag, 
	Project, 
	Role, 
};