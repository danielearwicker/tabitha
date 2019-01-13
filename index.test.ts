import { tabulate } from "./index";

test("empty gives empty", () => {
    expect(tabulate("")).toBe("");
});

test("tab becomes bar", () => {
    expect(tabulate("a\tb")).toBe("a | b");
});

test("tabs become bars", () => {
    expect(tabulate("very long\tshort\ttiny\treally long again"))
            .toBe("very long | short | tiny | really long again");
});

test("multiple lines get a divider", () => {
    expect(tabulate("First name\tLast name\tBorn\tNationality\n" + 
                    "Obidiah\tMcTeabag\t1980\tScottish"))
            .toBe("First name | Last name | Born | Nationality\n" + 
                  "-----------+-----------+------+------------\n" +   
                  "Obidiah    | McTeabag  | 1980 | Scottish   ");
});

test("columns are padded to constant width", () => {
    expect(tabulate("First name\tLast name\tBorn\tNationality\n" + 
                    "O\tMcTeabag\t1980\tScottish\n" +
                    "Melvin\tBogdanovich\t-\tEastern Basingstoke"))
            .toBe("First name | Last name   | Born | Nationality        \n" + 
                  "-----------+-------------+------+--------------------\n" +   
                  "O          | McTeabag    | 1980 | Scottish           \n" +
                  "Melvin     | Bogdanovich | -    | Eastern Basingstoke");
});
