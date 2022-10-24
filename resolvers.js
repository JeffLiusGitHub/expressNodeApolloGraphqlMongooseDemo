const Post = require('./models/Post.model');
const resolvers = {
	Query: {
		hello: () => {
			return 'Hello world';
		},
		getAllPosts: async () => {
			return await Post.find();
		},
		getPost: async (_, { id }, __, ___) => {
			return await Post.findById(id);
		},
	},
	Mutation: {
		createPost: async (parent, args, context, info) => {
			const { title, description } = args.post;
			const post = new Post({ title, description });
			await post.save();
			return post;
		},

		deletePost: async (_, { id }, __, ___) => {
			await Post.findByIdAndDelete(id);
			return 'Post deleted';
		},
		updatePost: async (_, args, __, ___) => {
			const { title, description } = args.post;
			const { id } = args;
			const updates = {};
			if (title != undefined) {
				updates.title = title;
			}
			if (description != undefined) {
				updates.description = description;
			}
			const post = await Post.findByIdAndUpdate(id, updates, { new: true });
			return post;
		},
	},
};

module.exports = resolvers;
