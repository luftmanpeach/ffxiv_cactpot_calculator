package kujira;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;

class Cell {
	public int value = 0;
	public int id;
	private Integer[] all = {1,2,3,4,5,6,7,8,9};
	public ArrayList<Integer> potential_values = new ArrayList<Integer>(Arrays.asList(all));
	public Cell(int id) {
		this.id = id;
	}
}


public class kujira_main {
	public static Hashtable<Integer, Integer> prize = new Hashtable<Integer, Integer>();
	
	public static Cell[][] cells = {
			{new Cell(1), new Cell(2), new Cell(3)},
			{new Cell(4), new Cell(5), new Cell(6)},
			{new Cell(7), new Cell(8), new Cell(9)}
	};
	
	public static void set(Cell cell, int a) {
		for (int row = 0; row < 3; row++) {
			for (int col = 0; col < 3; col++) {
				if (cells[row][col].id == cell.id) {
					cell.value = a;
					cell.potential_values.clear();
					cell.potential_values.add(a);
				} else {
					cells[row][col].potential_values.remove(Integer.valueOf(a));
				}
			}
		}
	}
	
	public static void main(String args[]) {
		// setup
		prize.put(6, 10000);
		prize.put(7, 36);
		prize.put(8, 720);
		prize.put(9, 360);
		prize.put(10, 80);
		prize.put(11, 252);
		prize.put(12, 108);
		prize.put(13, 72);
		prize.put(14, 54);
		prize.put(15, 180);
		prize.put(16, 72);
		prize.put(17, 180);
		prize.put(18, 119);
		prize.put(19, 36);
		prize.put(20, 306);
		prize.put(21, 1080);
		prize.put(22, 144);
		prize.put(23, 1800);
		prize.put(24, 3600);
		
		set(cells[0][0], 1);
		
		print_kujira();
		
		// calculation
		System.out.print("ROW 1 Expectation: "); calculate(cells[0][0], cells[0][1], cells[0][2]);
		System.out.print("ROW 2 Expectation: "); calculate(cells[1][0], cells[1][1], cells[1][2]);
		System.out.print("ROW 3 Expectation: "); calculate(cells[2][0], cells[2][1], cells[2][2]);
		System.out.println();
		System.out.print("COL 1 Expectation: "); calculate(cells[0][0], cells[1][0], cells[2][0]);
		System.out.print("COL 2 Expectation: "); calculate(cells[0][1], cells[1][1], cells[2][1]);
		System.out.print("COL 3 Expectation: "); calculate(cells[0][2], cells[1][2], cells[2][2]);
		System.out.println();
		System.out.print("\\ Expectation: "); calculate(cells[0][0], cells[1][1], cells[2][2]);
		System.out.print("/ Expectation: ");  calculate(cells[0][2], cells[1][1], cells[2][0]);
	}
	
	
	static int total_possibilities;
	static int expectation;
	public static void calculate(Cell a, Cell b, Cell c) {
		total_possibilities = 0;
		expectation = 0;
		Hashtable<Integer, Integer> appearance = new Hashtable<Integer, Integer>();
		for(int i = 0; i < a.potential_values.size(); i++) {
			for(int j = 0; j < b.potential_values.size(); j++) {
				for(int k = 0; k < c.potential_values.size(); k++) {
					int x = a.potential_values.get(i);
					int y = b.potential_values.get(j);
					int z = c.potential_values.get(k);
					if (x != y && y != z && x != z) {
						int sum = x + y + z;
						if (appearance.containsKey(sum)) {
							appearance.replace(sum, appearance.get(sum)+1);
						} else {
							appearance.put(sum, 1);
						}
						total_possibilities += 1;
					}
				}
			}
		}
		
		Hashtable<Integer, Double> probability = new Hashtable<Integer, Double>();
		appearance.forEach((k, v) -> {
			int value = prize.get(k);
			double possibility = (double) v / total_possibilities;
			expectation += value * possibility;
			if (probability.containsKey(value)) {
				probability.replace(value, probability.get(value)+possibility);
			} else {
				probability.put(value, possibility);
			}

		});
		System.out.println(expectation);
		
		List<Integer> keys = new ArrayList<Integer>(probability.keySet());
		Collections.sort(keys, Collections.reverseOrder());
		for(Integer i: keys) {
			System.out.printf("%6d %6.4f", i, probability.get(i));
		}
		System.out.println();
		
		
	}
	
	public static void print_kujira() {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("---------\n");
		for (int row = 0; row < 3; row++) {
			stringBuilder.append("| ");
			for (int col = 0; col < 3; col++) {
				stringBuilder.append(cells[row][col].value + " ");
			}
			stringBuilder.append("|\n");
		}
		stringBuilder.append("---------\n");
		System.out.println(stringBuilder.toString());
	}
}
