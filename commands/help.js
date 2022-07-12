const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends a list of commands."),
  async execute(interaction) {
    await interaction.reply({
      content:
        "**" +
        "cnote" +
        "**" +
        " - Creates a note with a category." +
        "\n" +
        "**" +
        "note" +
        "**" +
        " - Creates a note." +
        "\n" +
        "**" +
        "timer" +
        "**" +
        " - Creates a timer." +
        "\n" +
        "**" +
        "todo" +
        "**" +
        " - Creates a todo list." +
        "\n",
      ephemeral: true,
    });
  },
};
