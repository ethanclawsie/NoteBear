const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Creates a timer.")
    .addStringOption((option) =>
      option
        .setName("time")
        .setRequired(true)
        .setDescription("The time in minutes.")
    ),
  execute: async (interaction) => {
    const time = interaction.options.getString("time");
    interaction.reply({ content: "Timer will alert in DM.", ephemeral: true });
    setTimeout(() => {
      interaction.user.send(time + " minute timer is up");
    }, time * 60 * 1000);
  },
};
