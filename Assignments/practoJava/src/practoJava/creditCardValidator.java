package practoJava;

public class creditCardValidator {

	
	
/* ===================  check if math is valid ===============*/
	private int addTwoDigit(int number) {
		return (number%10) + (number/10);
	}
	
	private boolean checkValidByMath(String credNumber) {
		int index=credNumber.length()-1;
		int chk=0;
		
		int totalSum=0;
		int cur=0;
		while(index>=0) {
			cur=Integer.parseInt(Character.toString(credNumber.charAt(index)));
			
			if(chk==1) {
				cur*=2;
				if(cur>9) {
					cur=addTwoDigit(cur);
				}
			}
			totalSum+=cur;
			chk=(chk+1)%2;
			index-=1;
		}
		return (totalSum%10)==0;
		
	}
	
	
/* ===================== check if prefix is valid ==================*/
	
	private boolean checkPrefix(String credNumber) {
		return (credNumber.startsWith("4")||credNumber.startsWith("5")||credNumber.startsWith("6")||credNumber.startsWith("37"));
	}
	
	
/* ========================check if length is valid ========================*/
	
	private boolean checkLength(String credNumber) {
		return (credNumber.length()>=13)&&(credNumber.length()<=16);
	}
	
	
/*=========================== the root function ============================*/
	boolean isCredCardValid(String credNumber) {
		return checkLength(credNumber)&&checkPrefix(credNumber)&&checkValidByMath(credNumber); 
	}
	
	
/*=============================Driver Code ===============================*/
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		creditCardValidator obj=new creditCardValidator();
		System.out.println(obj.isCredCardValid("379354508162306"));

	}

}
