import EventMap from '../../Structure/EventMap.js';

export default class extends EventMap {
  constructor(client) {
    super(client, {
      name: 'guildMemberAdd'
    });
  }
  run = async (member) => {
    // TODO: member.roles.add('') < Cargo a ser adicionado quando um membro entra no servidor >
  }
}