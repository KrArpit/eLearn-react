import InstructorCourses from "@/components/instructorView/courses"
import InstructorDashboard from "@/components/instructorView/dashboard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { BarChart, Book, LogOut } from "lucide-react"
import { useState } from "react"


function InstrctorDashboardPage() {

    const [activeTab, setActiveTab] = useState('dashboard')

    const menuItems = [
        {
            icon: BarChart,
            label: 'Dashboard',
            value: 'dashboard',
            component: <InstructorDashboard/>
        },
        {
            icon: Book,
            label: 'Courses',
            value: 'courses',
            component: <InstructorCourses/>
        },
        {
            icon: LogOut,
            label: 'Logout',
            value: 'logout',
            component: null
        }
    ]

    function handleLogout(){

    }


  return (
    <div className="flex h-full min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md hidden md:block">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
                <nav>
                    {
                        menuItems.map(menuItem => 
                        <Button 
                            className="w-full justify-start mb-2"
                            key={menuItem.value}
                            onClick={menuItem.value === 'logout'?handleLogout:()=>setActiveTab(menuItem.value)}>
                            <menuItem.icon className="mr-2 h-4 w-4"/>
                            {menuItem.label}
                        </Button>)
                    }
                </nav>
            </div>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 ">Dashboard</h1>
                <Tabs value={activeTab}
                    onValueChange={setActiveTab}>
                        {
                        menuItems.map(menuItem => <TabsContent value={menuItem.value} key={menuItem.value}>
                            {
                                menuItem.component !== null ? menuItem.component : null
                            }
                        </TabsContent>)
                        }

                </Tabs>
            </div>
        </main>
        </div>
  )
}

export default InstrctorDashboardPage