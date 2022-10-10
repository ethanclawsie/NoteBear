const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cnote")
    .setDescription("Creates a note with a category.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The category of the note.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to note.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("The color to identify the note.")
        .setRequired(false)
        .addChoices(
          { name: "🔴", value: "🔴" },
          { name: "🟠", value: "🟠" },
          { name: "🟡", value: "🟡" },
          { name: "🟢", value: "🟢" },
          { name: "🔵", value: "🔵" },
          { name: "🟣", value: "🟣" },
          { name: "⚪", value: "⚪" },
          { name: "⚫", value: "⚫" }
        )
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const category = interaction.options.getString("category");
    const text = interaction.options.getString("text");
    if (color != null) {
      (await interaction.user.send(
        color + " " + "__" + category + "__" + " " + text
      )) + interaction.reply({ content: "Note sent to DM.", ephemeral: true });
    } else {
      (await interaction.user.send("__" + category + "__" + " " + text)) +
        interaction.reply({ content: "Note sent to DM.", ephemeral: true });
    }
  },
};
