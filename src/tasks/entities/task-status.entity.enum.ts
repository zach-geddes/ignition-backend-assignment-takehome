import { registerEnumType } from "@nestjs/graphql";

export enum TaskStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
