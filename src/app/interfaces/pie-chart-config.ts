export class PieChartConfig {
    title: string;
    pieHole: number;
    colors: Array<string>;

    constructor(title: string, pieHole: number, colors: Array<string>) {
        this.title = title;
        this.pieHole = pieHole;
        this.colors = colors;
    }
}
