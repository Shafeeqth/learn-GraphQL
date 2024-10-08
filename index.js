import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";

import db from "./_db.js";
//server setup

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(parent, args, context) {
            return db.games.find(game=> game.id === args.id);

        },
        authors() {
            return db.authors; 
        },
        author(parent, args, context) {
            return db.authors.find(author=> author.id === args.id);

        },
        reviews() {
            return db.reviews;
        },
        review(parent, args, context) {
            return db.reviews.find(review=> review.id === args.id);
        
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => parent.id === review.game_id);
        }

    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id);

        }
    },
    Review: {
        author(parent) {
            return db.authors.find(a => a.id === parent.author_id);
        },
        game(parent) {
            return db.games.find(g=> g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter(g=> g.id !== args.id);
            return db.games;
        },

        addGame(_, args) {
            let game = {
                ...args.game,
                _id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game);
            return game;
        },
        updateGame(_, args) {
            db.games.map(g => {
                if(g.id === args.id) {
                    return {
                        ...g, ...args
                    }
                }
                return a
            })

            return db.games.find(g => g.id === args.id);
        }
        
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers

});

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
});

console.log('server ready at port', 4000);
