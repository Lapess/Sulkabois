import { TeamCalculationMethod } from "@/enums/TeamCalculationMethod";

interface TeamCalculationMethodOption {
  title: string;
  value: TeamCalculationMethod;
}
export const teamCalculationMethodOptions: TeamCalculationMethodOption[] = [
  {
    title: "Satunnainen",
    value: TeamCalculationMethod.Random,
  },
];
