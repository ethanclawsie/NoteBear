const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("todo")
    .setDescription("Creates a todo list by seperating the words by commas.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setRequired(true)
        .setDescription("The title of the todo list.")
    )
    .addStringOption((option) =>
      option
        .setName("tasks")
        .setRequired(true)
        .setDescription("The tasks of the todo list.")
    ),
  execute: async (interaction) => {
    const title = interaction.options.getString("title");
    const tasks = interaction.options.getString("tasks");
    const taskList = tasks.split(",");
    const taskListString = taskList.join("\n-");
    const message = `__${title}__\n-${taskListString}`;
    (await interaction.user.send(message)) +
      interaction.reply({ content: "List sent to DM.", ephemeral: true });
  },
};
