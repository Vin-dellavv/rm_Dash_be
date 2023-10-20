import fs from "fs";
import { PubSub } from 'graphql-subscriptions';

// get data from jsons
const episodes = JSON.parse(fs.readFileSync('./db/Episodes.json')).elements;
const locations = JSON.parse(fs.readFileSync('./db/Locations.json')).elements;
const characters = JSON.parse(fs.readFileSync('./db/Characters.json')).elements;

const pubsub = new PubSub();

const resolvers = {
  Query: {
		episode: id  => {
			return episodes.filter(episode => episode.id === id)
		},
		episodes: () => { return episodes },
		location: id => {
			return locations.filter(location => location.id === id)
		},
		locations: () => { return locations },
		character: id => {
			return characters.filter(character => character.id === id)
		},
		characters: () => { return characters },
	},
	Mutation: {
    addCharacter: (parent, args) => {
      const newCharacter = { id: characters.length + 1, ...args };
      characters.push(newCharacter);
      pubsub.publish('CHARACTER_ADDED', { characterAdded: newCharacter });
      return newCharacter;
    },
    addEpisode: (parent, args) => {
      const newEpisode = { id: episodes.length + 1, ...args };
      episodes.push(newEpisode);
      return newEpisode;
    },
    addLocation: (parent, args) => {
      const newLocation = { id: locations.length + 1, ...args };
      locations.push(newLocation);
      return newLocation;
    },
  }
};
export default resolvers;
