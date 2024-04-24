import 'package:flutter/material.dart';

class TestScreen extends StatefulWidget {
  const TestScreen({super.key});

  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  var value = null;
  void mainLogin() {
    if (value == null) {
      return null;
    } else {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(),
      appBar: AppBar(
        automaticallyImplyLeading: false,
        actions: [],
      ),
      body: SingleChildScrollView(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                Text('This is test'),
                Container(
                  decoration: BoxDecoration(color: Colors.white),
                  child: Center(
                    child: Text('this is the container for the test'),
                  ),
                ),
                ElevatedButton(onPressed: mainLogin, child: Text('Login')),
                Icon(Icons.abc_outlined),
                SizedBox(
                  height: 10,
                ),
                Expanded(
                  child: Row(
                    children: [
                      Column(
                        children: [],
                      )
                    ],
                  ),
                ),
                IconButton(onPressed: () {}, icon: Icon(Icons.r_mobiledata)),
                InkWell(
                  onDoubleTap: () {},
                  child: Text('pressed here'),
                ),
                TextField(
                  decoration: InputDecoration(fillColor: Colors.white),
                ),
                Container(
                  child: Text('sm-rxgs'),
                ),
                Expanded(
                    child: Column(
                  children: [
                    Text('hELLO WORLD'),
                  ],
                )),
                Icon(Icons.add_ic_call_outlined),
                Container(
                  decoration: BoxDecoration(
                    color: Colors.black,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      Text('This is a test'),
                      Icon(Icons.access_alarm),
                      Row(
                        children: [
                          Column(
                            children: [
                              Text(
                                'this is a test',
                                style: TextStyle(
                                    color: Colors.red,
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold),
                              ),
                              TextField(
                                decoration:
                                    InputDecoration(hintText: 'This is a test'),
                              ),
                              Container(
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10)),
                                child: Text('This is a test'),
                              )
                            ],
                          )
                        ],
                      )
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
