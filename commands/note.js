const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("Creates a note.")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to note.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    (await interaction.user.send(text)) +
      interaction.reply({ content: "Note sent to DM.", ephemeral: true });
  },
};
