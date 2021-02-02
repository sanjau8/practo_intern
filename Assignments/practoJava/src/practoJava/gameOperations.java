package practoJava;

//imports
import java.util.HashMap;




abstract class operations{

	HashMap<String,Integer> colors=new HashMap<String, Integer>();
	String speak(String color) {
		return "I'm "+getName()+"! I'm sometimes "+color;
	}
	
	abstract String getName();

}

class apple extends operations{

	
	apple(){
		colors.put("red", 1);
		colors.put("green", 1);
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "Apple";
	}
		
	
}

class banana extends operations{

	
	banana(){
		colors.put("yellow", 1);
		colors.put("green", 1);
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "Banana";
	}
		
	
}

class salt extends operations{
	
	salt(){
		colors.put("white", 1);
		
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "Salt";
	}
		
	
}


class ink extends operations{
	
	ink(){
		colors.put("red", 1);
		colors.put("black", 1);
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "Ink";
	}
		
	
}

class blood extends operations{
	
	blood(){
		colors.put("red", 1);
		
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "blood";
	}
		
	
}

class sky extends operations{
	
	sky(){
		colors.put("blue", 1);
		colors.put("black", 1);
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "Sky";
	}
		
	
}

class frog extends operations{
	
	frog(){
		colors.put("blue", 1);
		colors.put("yellow", 1);
	}
	
	@Override
	String getName() {
		// TODO Auto-generated method stub
		return "Frog";
	}
	
	String speak(String color) {
		return "I'm "+getName()+"! I am "+color+" today";
	}
		
}


public class gameOperations {
	
	
	private HashMap<String,operations> subscribed;
	
	gameOperations(){
		subscribed=new HashMap<String,operations>();
	}
	
	/* ============= FACTORY TO RETURN OBJECT ==================== */
	
	private operations entityFactory(String entity) {
		
		entity=entity.toLowerCase();
		switch(entity) {
		case "apple":return new apple();
		
		case "frog":return new frog();
		
		case "banana":return new banana();
		
		case "salt":return new salt();
		
		case "ink":return new ink();
		
		case "blood":return new blood();
		
		case "sky":return new sky();
		
		default: return null;
		
		}
	}
	
	
	
	
	/* ============= SUBSCRIBE ==================== */
	private boolean subscribe(String entity) {
		operations ent=entityFactory(entity);
		if(ent==null) {
			return false;
		}
		
		
		subscribed.put(entity.toLowerCase(),ent);
		return true;
	}
	
	
	
	/* ============= UNSUBSCRIBE ==================== */
	
	private boolean unsubscribe(String entity) {
		
		if(subscribed.containsKey(entity.toLowerCase())) {
			subscribed.remove(entity.toLowerCase());
			return true;
		}
		return false;
		
	}
	
	
	
	/* ============= PRINT BY COLORS ==================== */
	
	private void colorMatch(String color) {
		
		subscribed.forEach((k, v) -> { 
		
		if(v.colors.containsKey(color)) {
			System.out.println(v.speak(color.toLowerCase()));
			
		}
		}
		); 
		
	}
	
	
	/* ============= PRINT ALL SUBSCRIBED ==================== */
	
	private void printAllSubscribed() {
		System.out.print("[");
		subscribed.forEach((k, v) -> { 
			
			
				System.out.print(k+" ");
				
			
			}
			); 
		System.out.println("]");
	}
	
	
	
	/* ============= TO RESOLVE COMMAND ==================== */
	
	private String toCommand(String command) {
		if(command.startsWith("+")) {
			return "Subscribe";
		}
		else if(command.startsWith("-")) {
			return "unSubscribe";
		}
		else {
			return command;
		}
	}
	
	
	
	/* ============= ACTUAL COMMAND ==================== */
	void getCommmands(String command) {
		
		
		switch(toCommand(command)) {
		case "list": printAllSubscribed();
		break;
		case "Subscribe": 
			
			if(subscribe(command.substring(1))) {
				System.out.println("Subscribed "+command.substring(1));
			}
			else {
				System.out.println("Some Error occured");
			}
		break;
		case "unSubscribe":
			if(unsubscribe(command.substring(1))) {
				System.out.println("unSubscribed "+command.substring(1));
			}
			else {
				System.out.println("Some Error occured");
			}
			break;
		case "exit":
			System.out.println("Bye Bye!");
			System.exit(0);
		default:
			colorMatch(command);
			break;
			
		}
		
	}
	
	
}
