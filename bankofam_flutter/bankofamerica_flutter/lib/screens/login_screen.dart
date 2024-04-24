import 'package:bankofamerica_flutter/screens/home_screen.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final formkey = GlobalKey<FormState>();

  bool? isChecked = false;

  void login() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const HomeScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(18.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(
                      left: 38.0, right: 38, top: 1, bottom: 10),
                  child: Image.asset('assets/images/logo1.png'),
                ),
                //---------------------------------------- login box --------------
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(
                            color: Colors.grey,
                            blurRadius: 3,
                            spreadRadius: 1,
                            offset: Offset(0, 0))
                      ],
                    ),
                    child: Form(
                      key: formkey,
                      child: Column(
                        children: [
                          SizedBox(
                            height: 10,
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 13.0),
                            child: TextFormField(
                              decoration: InputDecoration(
                                hintStyle: TextStyle(
                                    fontSize: 14, color: Colors.blue.shade700),
                                hintText: 'User ID',
                                isDense: true,
                                contentPadding:
                                    EdgeInsets.only(bottom: 8, top: 5),
                              ),
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return 'Please enter user ID';
                                } else {
                                  return null;
                                }
                              },
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(13.0),
                            child: TextFormField(
                              obscureText: true,
                              decoration: InputDecoration(
                                hintStyle: TextStyle(fontSize: 14),
                                hintText: 'Password',
                                isDense: true,
                                contentPadding: EdgeInsets.only(bottom: 8),
                              ),
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return 'Please enter a correct password';
                                } else {
                                  return null;
                                }
                              },
                            ),
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 8.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    SizedBox(
                                      width: 14,
                                    ),
                                    SizedBox(
                                      height: 10,
                                      width: 10,
                                      child: Checkbox(
                                          value: isChecked,
                                          side: BorderSide(
                                            color: Colors.blue.shade600,
                                          ),
                                          activeColor: Colors.blue,
                                          onChanged: (newBool) {
                                            setState(() {
                                              isChecked = newBool;
                                            });
                                          }),
                                    ),
                                    SizedBox(
                                      width: 8,
                                    ),
                                    Text('Save User ID',
                                        style: TextStyle(
                                            color: Colors.blue,
                                            fontSize: 11,
                                            fontWeight: FontWeight.w500))
                                  ],
                                ),
                                Row(
                                  children: [
                                    SizedBox(
                                      height: 10,
                                      width: 10,
                                      child: Checkbox(
                                          side: BorderSide(
                                            color: Colors.blue.shade600,
                                          ),
                                          value: isChecked,
                                          activeColor: Colors.blue,
                                          onChanged: (newBool) {
                                            setState(() {
                                              isChecked = newBool;
                                            });
                                          }),
                                    ),
                                    SizedBox(
                                      width: 8,
                                    ),
                                    Text('Set up biometrics',
                                        style: TextStyle(
                                            color: Colors.blue,
                                            fontSize: 11,
                                            fontWeight: FontWeight.w500))
                                  ],
                                ),
                              ],
                            ),
                          ),
                          SizedBox(
                            height: 8,
                          ),
                          ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      Color.fromARGB(255, 16, 84, 139)),
                              onPressed: () {
                                if (formkey.currentState!.validate()) {
                                  login();
                                }
                                ;
                              },
                              child: Text(
                                'LOG IN',
                              )),
                          TextButton(
                              onPressed: () {},
                              child: Text(
                                'Forgot ID/Password',
                                style:
                                    TextStyle(color: Colors.blue, fontSize: 11),
                              ))
                        ],
                      ),
                    ),
                  ),
                ),
                //----------------------------------------------------------------
                SizedBox(
                  height: 5,
                ),
                TextButton(onPressed: () {}, child: Text('Enroll')),
                SizedBox(
                  height: 1,
                ),

                Image.asset('assets/images/adver.png'),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextButton(onPressed: () {}, child: Text('Location')),
                    SizedBox(
                      width: 3,
                    ),
                    Container(
                      height: 10,
                      width: 1,
                      color: Colors.grey,
                    ),
                    SizedBox(
                      width: 3,
                    ),
                    TextButton(onPressed: () {}, child: Text('Contact us')),
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  child: Text(
                      'Investing in securities involves risks, and there is always the potential of losing money when you invest in securities'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
