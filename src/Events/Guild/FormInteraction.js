import EventMap from '../../Structure/EventMap.js';
import { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ChannelType } from 'discord.js';

export default class extends EventMap {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
    });
  }
  run = async (interaction) => {
    const name = new ActionRowBuilder()
    .addComponents(
        new TextInputBuilder()
        .setCustomId('nome')
        .setLabel('Nome completo do personagem:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true),
    )

    const cidade = new ActionRowBuilder()
    .addComponents(
        new TextInputBuilder()
        .setCustomId('cidade')
        .setLabel('Telefone na cidade:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )

    const passaporte = new ActionRowBuilder()
    .addComponents(
        new TextInputBuilder()
        .setCustomId('passaporte')
        .setLabel('Passaporte:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )

    const recrutador = new ActionRowBuilder()
    .addComponents(
        new TextInputBuilder()
        .setCustomId('recrutador')
        .setLabel('Quem recrutou:')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
    )

    const modal = new ModalBuilder()
    .setCustomId('whitelist')
    .setTitle('Formulário de Whitelist')
    .addComponents([name, cidade, passaporte, recrutador]);

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('create_farm')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Criar Pasta')
        .setEmoji('➕')
    )

    if (interaction.customId === 'registro') {
        interaction.showModal(modal)
        return;
    }

    else if (interaction.customId === 'whitelist') {
        const nome = interaction.fields.getTextInputValue('nome');
        const cidade = interaction.fields.getTextInputValue('cidade');
        const passaporte = interaction.fields.getTextInputValue('passaporte');
        const recrutador = interaction.fields.getTextInputValue('recrutador');

        const log = this.client.channels.cache.get('1167436738952712243')

        interaction.member.setNickname(`${nome} | ${passaporte}`)

        const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true, size: 2048 }) })
        .setTitle('Registro Casa Blanca')
        .addFields(
            { name: 'Nome na Cidade', value: nome, inline: true },
            { name: 'Telefone da Cidade', value: cidade, inline: true },
            { name: 'Passaporte', value: passaporte, inline: true },
            { name: 'Quem te Recrutou', value: recrutador, inline: true }
        )
        .setFooter({ text: `${interaction.user.id}` })
        .setTimestamp()
        
        log.send({ embeds: [embed] })

        interaction.member.roles.add('1167440804109889638').catch(() => { }) // TODO: < ID DO Cargo a ser implementado >

        interaction.reply({ embeds: [
            new EmbedBuilder()
            .setDescription('✅ **|** Registro realizado com sucesso')
            .setColor('#313338')
        ], ephemeral: true })
        return;
    }

    else if (interaction.customId === 'folder_open') {
        interaction.reply({ content: 'Se você não criou sua pasta de farm, basta clicar no botão CRIAR PASTA DE FARM 😀', components: [button], ephemeral: true })
        return;
    }

    else if (interaction.customId === 'create_farm') {
        const search_channel = interaction.guild.channels.cache.find(c => c.name === `${interaction.member.nickname}` || c.name === `${interaction.user.username}`)
        if (search_channel) {
            interaction.reply({ content: `Você ja tem uma farm criada em ${search_channel}`, ephemeral: true })
            return;
        }

        const thread = await interaction.channel.threads.create({
            name: interaction.member.nickname ?? interaction.user.username,
            type: ChannelType.PrivateThread,
            reason: `O usuário ${interaction.user.username} acabou de abrir uma farm`,
        });

        thread.send({ content: `🔔 | ${interaction.user} Olá! Sua pasta de farm foi criada.
        
Aqui está o que você precisa farmar durante a semana:
        
METAS/VALORES DE FARME
        
Segunda-feira 2000x AK = $200K
Terça-feira 1000x AK e 1000x FIVE = $200K
Quarta-feira 2000x AK = $200K
Quinta-feira 1000x AK e 1000x FIVE = $200K
Sexta-feira 1000x AK e 100x Five = $200K

<@&1170414804154978314>` }).then(() => {
            interaction.reply({ content: `Criei um ticket pra você!😉 ${thread}`, ephemeral: true })
        })
    }
  }
}