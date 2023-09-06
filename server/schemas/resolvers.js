const { User, Title } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const titleSchema = require("../models/Title");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    // deleteUser: async (parent, args, context) => {
    //   if (context.user) {
    //   User.findOneAndDelete({ _id: context.user._id })
    //   .then((dbUserData) => {
    //     if (!dbUserData) {
    //       return res.status(404).json({ message: 'No user found with this id!' });
    //     }
    //     Title.deleteMany({ _id: { $in: dbUserData.savedTitles } })
    //       .then(() => {res,status(200).json({ message: 'User and associated titles deleted!' });
    //       })
    //       .catch((err) => res.status(400).json(err));
    //   })
    //   .catch((err) => res.status(400).json(err));
    //   }
    // },

    deleteUser: async (parent, args, context) => {
      if (context.user) {
        try {
          const dbUserData = await User.findOneAndDelete({
            _id: context.user._id,
          });

          if (!dbUserData) {
            throw new Error("No user found with this id!");
          }
          if (dbUserData.savedTitles && dbUserData.savedTitles.length > 0) {
            await Title.deleteMany({ _id: { $in: dbUserData.savedTitles } });
          }
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new Error("You must be logged in to delete a user!");
      }
    },

    saveTitle: async (parent, { input }, context) => {
      console.log("trying to save:", input);
      if (context.user) {
        const addTitle = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedTitles: input } },
          { new: true, runValidators: true }
        );
        return addTitle;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeTitle: async (parent, { id }, context) => {
      if (context.user) {
        const removeTitle = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedTitles: { id } } },
          { new: true }
        );
        return removeTitle;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // saveActor: async (parent, { input }, context) => {
    //   if (context.user) {
    //     const addActor = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { savedActors: actor } },
    //       { new: true, runValidators: true }
    //     );
    //     return addActor;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // removeActor: async (parent, { actorId }, context) => {
    //   if (context.user) {
    //     const removeActor = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedActors: { actorId } } },
    //       { new: true }
    //     );
    //     return removeActor;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
