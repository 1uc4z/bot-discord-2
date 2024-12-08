import SlashCommands from '../../Structure/SlashCommands.js';
import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';

export default class extends SlashCommands {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
     	.setName('set')
     	.setDescription('[Moderação] Comando privado apenas para o administradores do servidor.')  
      .addSubcommand(subcommand => subcommand
        .setName('botão')
         .setDescription('[Moderação] Comando privado apenas para o administradores do servidor.')  
          .addChannelOption(option => option 
              .setName('channel')
              .setDescription('[Channel] Qual canal o botão sera enviado?')
              .addChannelTypes(ChannelType.GuildText)
          )
      )
      .addSubcommand(subcommand => subcommand
        .setName('pasta')
         .setDescription('[Moderação] Comando privado apenas para o administradores do servidor.')  
          .addChannelOption(option => option 
              .setName('channel')
              .setDescription('[Channel] Qual canal a pasta será enviada?')
              .addChannelTypes(ChannelType.GuildText)
          )
      )
    });
  }

  run = async (interaction) => {
    const subcommand = interaction.options.getSubcommand();
    const channel = interaction.options.getChannel('channel') ?? interaction.channel;

    const set_button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setEmoji('📝')
        .setLabel('Fazer Registro')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('registro')
    )

    const embed = new EmbedBuilder()
    .setTitle(`${interaction.guild.name}`)
    .setDescription('Ainda não criou pasta na farm? Basta clicar em selecione uma opção e após isso criar pasta de farm')
    .setColor('#0000FF')

    const folder_drop = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
			.setCustomId('folder_open')
			.setPlaceholder('Selecione uma opção...')
			.addOptions(
        new StringSelectMenuOptionBuilder()
					.setLabel('Fazer Registro')
					.setValue('registro')
          .setEmoji('📝'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Criar pasta de farm')
					.setValue('farm_criar')
          .setEmoji('💼'),
      )
    )

    switch (subcommand) {
      case 'botão':
        channel.send({ components: [set_button] }).then(() => {
          interaction.reply({ content: `Botão enviado com sucesso para o canal ${channel}`, ephemeral: true })
        })
      break;
      case 'pasta':
        channel.send({ embeds: [embed], components: [folder_drop] }).then(() => {
          interaction.reply({ content: `Pasta enviada com sucesso para o canal ${channel}`, ephemeral: true })
        })
      break;
    }
  }
}