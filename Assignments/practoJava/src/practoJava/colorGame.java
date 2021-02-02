package practoJava;

import java.util.Scanner;

public class colorGame {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		gameOperations obj=new gameOperations();
		Scanner s=new Scanner(System.in);
		String cmnd;
		while(true) {
			cmnd=s.next();
			obj.getCommmands(cmnd);
		}
	}

}
